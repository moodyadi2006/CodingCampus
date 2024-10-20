export type Problem = {
  id: string;
  title: string;
  difficulty: string;
  Company: string;
  category: string;
  order: number;
  videoId?: string;
};

export const problems: Problem[] = [
  {
    id: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    category: "Array",
    Company: "Atlantis",
    order: 1,
    videoId: "8-k1C6ehKuw",
  },
  {
    id: "reverse-linked-list",
    title: "Reverse Linked List",
    difficulty: "Hard",
    category: "Linked List",
    Company: "Accenture",
    order: 2,
    videoId: "",
  },
  {
    id: "jump-game",
    title: "Jump Game",
    difficulty: "Medium",
    Company: "Accenture",
    category: "Dynamic Programming",
    order: 3,
    videoId: "",
  },
  {
    id: "valid-parentheses",
    title: "Valid Parentheses",
    difficulty: "Easy",
    Company: "Accenture",
    category: "Stack",
    order: 4,
    videoId: "xty7fr-k0TU",
  },
  {
    id: "search-a-2d-matrix",
    title: "Search a 2D Matrix",
    difficulty: "Medium",
    Company: "Accenture",
    category: "Binary Search",
    order: 5,
    videoId: "ZfFl4torNg4",
  },
  {
    id: "container-with-most-water",
    title: "Container With Most Water",
    difficulty: "Medium",
    Company: "Accenture",
    category: "Two Pointers",
    order: 6,
    videoId: "",
  },
  {
    id: "merge-intervals",
    title: "Merge Intervals",
    difficulty: "Medium",
    Company: "Accenture",
    category: "intervals",
    order: 7,
    videoId: "",
  },
  {
    id: "maximum-depth-of-binary-tree",
    title: "Maximum Depth of Binary Tree",
    difficulty: "Easy",
    Company: "Accenture",
    category: "Tree",
    order: 8,
    videoId: "4qYTqOiRMoM",
  },
  {
    id: "best-time-to-buy-and-sell-stock",
    title: "Best Time to Buy and Sell Stock",
    difficulty: "Easy",
    Company: "Accenture",
    category: "Array",
    order: 9,
    videoId: "",
  },
  {
    id: "subsets",
    title: "Subsets",
    difficulty: "Medium",
    Company: "Accenture",
    category: "Backtracking",
    order: 10,
    videoId: "",
  },
];