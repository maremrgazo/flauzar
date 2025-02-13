import { useCallback, useState } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Handle,
  Position,
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog.tsx";
import { useGlobalContext } from "./GlobalContext";
import SettingsPage from './components/SettingsPage';
import CustomEdge from './components/CustomEdge';
import VariablesPage from './components/VariablesPage';
import Combobox from './components/Combobox'; // Import the Combobox component

const proOptions = { hideAttribution: true };

type NodeData = {
  label: string;
  rotation?: number;
};

type ValveNodeProps = {
  id: string;
  data: NodeData;
  rotateNode: (id: string) => void;
  deleteNode: (id: string) => void;
  showInfo: (data: NodeData) => void;
};

const ValveNode: React.FC<ValveNodeProps> = ({ id, data, rotateNode, deleteNode, showInfo }) => {
  return (
    <div
      style={{
        width: 80,
        height: 50,
        backgroundColor: '#ddd',
        borderRadius: '50%',
        textAlign: 'center',
        lineHeight: '50px',
        position: 'relative',
        border: '2px solid black',
      }}
    >
      {data.label}
      <button
        onClick={() => rotateNode(id)}
        style={{
          position: 'absolute',
          top: '-15px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'lightgray',
          border: 'none',
          cursor: 'pointer',
          fontSize: '10px',
          padding: '1px 4px',
          borderRadius: '4px',
        }}
      >
        ⟳
      </button>
      <button
        onClick={() => deleteNode(id)}
        style={{
          position: 'absolute',
          top: '50%',
          left: '-25px',
          transform: 'translateY(-50%)',
          background: 'red',
          border: 'none',
          cursor: 'pointer',
          fontSize: '10px',
          padding: '2px 4px',
          borderRadius: '4px',
          color: 'white',
        }}
      >
        ❌
      </button>
      <button
        onClick={() => showInfo(data)}
        style={{
          position: 'absolute',
          top: '50%',
          right: '-25px',
          transform: 'translateY(-50%)',
          background: 'blue',
          border: 'none',
          cursor: 'pointer',
          fontSize: '10px',
          padding: '2px 4px',
          borderRadius: '4px',
          color: 'white',
        }}
      >
        ℹ️
      </button>
      <Handle type="source" position={Position.Right} style={{ background: '#555', width: 16, height: 16 }} />
      <Handle type="target" position={Position.Left} style={{ background: '#555', width: 16, height: 16 }} />
    </div>
  );
};

const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: 'Valve 1', rotation: 0 }, type: 'valve' },
  { id: '2', position: { x: 200, y: 0 }, data: { label: 'Valve 2', rotation: 0 }, type: 'valve' },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2', type: 'custom', data: { onDelete: () => {} } }];

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedNodeData, setSelectedNodeData] = useState<NodeData | null>(null);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge({ ...params, type: 'custom', data: { onDelete: deleteEdge } }, eds)),
    [setEdges]
  );

  const showInfo = (data: NodeData) => {
    setSelectedNodeData(data);
    setDialogOpen(true);
  };

  const rotateNode = (nodeId: string) => {
    setNodes((nds) =>
      nds.map((n) =>
        n.id === nodeId
          ? {
              ...n,
              data: { ...n.data, rotation: (n.data.rotation || 0) + 90 },
            }
          : n
      )
    );
  };

  const addNode = () => {
    const id = (nodes.length + 1).toString();
    const newNode = {
      id,
      position: { x: Math.round(Math.random() * 400 / 20) * 20, y: Math.round(Math.random() * 400 / 20) * 20 },
      data: { label: `Valve ${id}`, rotation: 0 },
      type: 'valve',
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const deleteNode = (nodeId: string) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
  };

  const deleteEdge = (edgeId: string) => {
    setEdges((eds) => eds.filter((edge) => edge.id !== edgeId));
  };

  const { globalString } = useGlobalContext();

  if (globalString === "main") {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <button onClick={addNode} style={{ position: 'absolute', zIndex: 10, padding: '5px', right: '0px', bottom: '0px' }}>
          Add Node
        </button>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          proOptions={proOptions}
          snapToGrid={true}
          nodeTypes={{ valve: (props) => <ValveNode {...props} rotateNode={rotateNode} deleteNode={deleteNode} showInfo={showInfo} /> }}
          edgeTypes={{ custom: CustomEdge }}
        >
          <Controls />
          <MiniMap />
          <Background variant={BackgroundVariant.Dots} gap={20} size={1} />
        </ReactFlow>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <button style={{ display: 'none' }}>Open Dialog</button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Node Information</DialogTitle>
            <Combobox /> {/* Add the Combobox component here */}
            <DialogDescription>
              {selectedNodeData && (
                <>
                  <p>Label: {selectedNodeData.label}</p>
                  <p>Rotation: {selectedNodeData.rotation || 0}°</p>
                </>
              )}
            </DialogDescription>
          </DialogContent>
        </Dialog>
      </div>
    );
  } else if (globalString === "settings") {
    return <SettingsPage />;
  } else if (globalString === "variables") {
    return <div style={{ width: '80%', margin: "auto" }}><VariablesPage /></div>;
  }
}