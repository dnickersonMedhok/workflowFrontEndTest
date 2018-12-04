//TODO: this has to become dynamically created
export const data = {
    connections: [
      {
        sourceId: "1",
        targetId: "2",
      },
      {
        sourceId: "2",
        targetId: "3",
      },
      {
        data: {
          condition: "true",
        },
        sourceId: "3",
        targetId: "4",
      },
      {
        data: {
          condition: "false",
        },
        sourceId: "3",
        targetId: "5",
      }
    ],
    nodes: [
      {
        config: {
          label: "Step 1",
          type: "transform",
        },
        id: "1",
      },
      {
        config: {
          label: "Step 2",
          type: "transform",
        },
        id: "2",
      },
      {
        config: {
          label: "Conditional logic",
          type: "condition",
        },
        id: "3",
      },
      {
        config: {
          label: "Step 3",
          type: "transform",
        },
        id: "4",
      },
      {
        config: {
          label: "Step 4",
          type: "transform",
        },
        id: "5",
      },
    ],
  };
  