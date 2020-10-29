const dataFileFormItems = [
  {
    name: "Max Diff File",
    id: 0,
    formats: ".csv, .xlsx, .xls, .sav",
    columnReceivers: [
                  {
                    name: "ID",
                    id: 0,
                    size: 1,
                  },
                  {
                    name: "Best Tasks",
                    id: 1,
                    size: 5,
                  },
                  {
                    name: "Worst Tasks",
                    id: 2,
                    size: 5,
                  },
                  {
                    name: "Best Ranks",
                    id: 3,
                    size: 5,
                  },
                  {
                    name: "Worst Ranks",
                    id: 4,
                    size: 5,
                  },
    ]
  },
]

export default dataFileFormItems