export class Node {
  public id: string;
  public data: { name: string };
  public attribute: { x: number, y: number, redius: number };

  constructor(id: string, data: { name: string }, attribute: { x: number, y: number, redius: number }) {
    this.id = id;
    this.data = data;
    this.attribute = attribute;
  }
}
