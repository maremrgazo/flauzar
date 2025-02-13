import React from 'react';
import { EdgeProps, getBezierPath } from '@xyflow/react';

const CustomEdge: React.FC<EdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  data,
}) => {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      <text>
        <textPath
          href={`#${id}`}
          style={{ fontSize: 12 }}
          startOffset="50%"
          textAnchor="middle"
        >
          <tspan
            dy="-10"
            onClick={() => data && typeof data.onDelete === 'function' && data.onDelete(id)}
            style={{ cursor: 'pointer', fill: 'red' }}
          >
            X
          </tspan>
        </textPath>
      </text>
    </>
  );
};

export default CustomEdge;