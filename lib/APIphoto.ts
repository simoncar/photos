import { db, firestore } from "./firebase";
import { IPost } from "./types";

function containsAsteriskBeforeHttp(str) {
	if (typeof str !== "string") {
		return false;
	}
	const httpIndex = str.indexOf("http");
	if (httpIndex === -1) {
		return false; // "http" not found in the string
	}

	const substringBeforeHttp = str.substring(0, httpIndex);
	return substringBeforeHttp.includes("*");
}

function splitOnFirst(str, character) {
	const index = str.indexOf(character);

	if (index === -1) {
		return [str]; // The character is not found, return the original string in an array
	}

	return [str.substring(0, index), str.substring(index + 1)];
}

export function parseImages(images: string[]) {
	const parsedImages: { ratio: number; url: string }[] = [];

	if (images === undefined || images.length === 0) {
		return [];
	}

	//firstly check if the images are already parsed
	if (images[0] && typeof images[0] === "object" && "ratio" in images[0] && "url" in images[0]) {
		return images; // Already parsed - this is the new format
	}

	//support for old format with asterisk before http
	images.forEach((image) => {
		if (containsAsteriskBeforeHttp(image)) {
			const parts = splitOnFirst(image, "*");
			parsedImages.push({ ratio: Number(parts[0]), url: parts[1] });
		} else {
			parsedImages.push({ ratio: 1, url: image });
		}
	});

	return parsedImages;
}

export async function getPosts(callback: any) {
	const q = firestore().collection("projects").doc("photos").collection("posts").orderBy("timestamp", "desc");

	const unsubscribe = q.onSnapshot((querySnapshot) => {
		const posts: IPost[] = [];
		querySnapshot?.forEach((doc) => {
			posts.push({
				key: doc.id,
				images: parseImages(doc.data().images) ?? [],
				ratio: doc.data().ratio ?? 1,
				timestamp: doc.data().timestamp,
				caption: doc.data().caption,
				linkURL: doc.data().linkURL ?? ""
			});
		});

		callback(posts);
	});

	return () => unsubscribe();
}
