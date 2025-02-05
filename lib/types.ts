import { Timestamp } from "firebase/firestore";

export interface IPost {
	key: string;
	caption: string;
	uid?: string;
	images?: {
		ratio: number;
		url: string;
	}[];
	timestamp?: Timestamp;
	ratio: number;
	linkURL?: string;
}
