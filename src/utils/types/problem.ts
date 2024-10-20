export type Example = {
  id: number;
  inputText: string;
  outputText: string;
  explanation?: string;
  image?: string
};

// local problem data
export type Problem = {
  id: string;
  title: string;
  problemStatement: string;
  examples: Example[];
  constraints: string;
  order: number;
  starterCode: string;
  handlerFunction: ((fn:any)=> boolean) | string;
  starterFunctionName: string;
}

export type DBProblem = {
  id: string;
  title: string;
  likes: number;
  difficulty: string;
  dislikes: number;
  category: string;
  order: number;
  videoId?: string;
  Company: string;
}