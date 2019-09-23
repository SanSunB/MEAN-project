// Model for post DB schema
export interface Post {
  id: string;
  folder?: string;
  title: string;
  content: string;
}
