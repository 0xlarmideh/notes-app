export interface ICreateNote {
  title?: string;
  text?: string;
}

export interface IUpdateNote extends ICreateNote {
  _id: string
}

export interface INote {
  _id: string;
  title: string;
  text: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
