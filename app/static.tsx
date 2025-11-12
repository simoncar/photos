import React from "react";
import { Text, View } from "@/components/Themed";
import { Image } from "expo-image";
import { ScrollView, StyleSheet } from "react-native";
// ...existing code...

const staticPosts = [
	{
		key: "1",
		title: "Aperture",
		images: [
			{
				url: "https://firebasestorage.googleapis.com/v0/b/builder-403d5.appspot.com/o/project%2Fphotos%2Fimages%2F9cffc8e1-e25e-43ea-a3c8-b4ab35219c1b?alt=media&token=2a894a51-082e-4707-b160-b10725e20842",
				description: "Fuzzy background with wide aperture.",
				notes: ["ƒ/2.8", "Shutter Speed 1/80 of a second", "ISO4000"],
				learnings: ""
			},
			{
				url: "https://via.placeholder.com/100x100?text=Image+2",
				description: "Narrow aperture keeps more of the scene in focus.",
				notes: ["Good for landscapes", "Less light reaches the sensor"]
			},
			{
				url: "https://via.placeholder.com/100x100?text=Image+3",
				description: "Aperture also affects exposure and depth of field.",
				notes: ["Use for creative effects", "Experiment with different f-numbers"]
			}
		]
	},
	{
		key: "2",
		title: "Shutter Speed",
		images: [
			{
				url: "https://via.placeholder.com/100x100?text=Image+1",
				description: "Fast shutter freezes motion.",
				notes: ["Use for sports or action shots", "Less light enters the camera"]
			},
			{
				url: "https://via.placeholder.com/100x100?text=Image+2",
				description: "Slow shutter creates motion blur.",
				notes: ["Use for creative blur effects", "Requires steady hands or tripod"]
			},
			{
				url: "https://via.placeholder.com/100x100?text=Image+3",
				description: "Shutter speed affects exposure.",
				notes: ["Long exposure for night photography", "Short exposure for bright scenes"]
			}
		]
	},
	{
		key: "3",
		title: "ISO",
		images: [
			{
				url: "https://via.placeholder.com/100x100?text=Image+1",
				description: "Low ISO for bright conditions.",
				notes: ["Less image noise", "Best for daylight"]
			},
			{
				url: "https://via.placeholder.com/100x100?text=Image+2",
				description: "High ISO for low light.",
				notes: ["More image noise", "Useful indoors or at night"]
			},
			{
				url: "https://via.placeholder.com/100x100?text=Image+3",
				description: "ISO affects sensitivity to light.",
				notes: ["Balance ISO with aperture and shutter speed", "Experiment for best results"]
			}
		]
	}
];

const StaticScreen = () => {
	function renderRow(data) {
		return (
			<View style={styles.outerView} key={data.key}>
				<Text style={[styles.message, { flexWrap: "wrap" }]}>{data.title}</Text>
				<View style={styles.imageContainer}>
					{data.images.map((img, idx) => (
						<View key={idx} style={styles.imageBlock}>
							<Image source={{ uri: img.url }} style={styles.image} />
							<Text style={styles.imageDescription}>{img.description}</Text>
							<View style={styles.notesList}>
								{img.notes.map((note, noteIdx) => (
									<Text key={noteIdx} style={styles.noteItem}>
										• {note}
									</Text>
								))}
							</View>
						</View>
					))}
				</View>
			</View>
		);
	}

	return (
		<ScrollView style={styles.logList} contentContainerStyle={{ flexGrow: 1 }}>
			<View style={[styles.container, { paddingHorizontal: 10 }]}>{staticPosts.map(renderRow)}</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "black"
	},
	logList: {
		paddingBottom: 50
	},
	row: {
		borderColor: "#CED0CE",
		borderWidth: StyleSheet.hairlineWidth,
		paddingVertical: 8,
		padding: 8,
		borderRadius: 24,
		marginBottom: 20,
		backgroundColor: "#282828",
		width: "100%"
	},
	outerView: {
		borderColor: "#CED0CE",
		borderWidth: StyleSheet.hairlineWidth,
		paddingVertical: 8,
		padding: 8,
		borderRadius: 24,
		marginBottom: 20,
		backgroundColor: "#282828",
		width: "100%"
	},
	textContainer: {
		padding: 10
	},
	photoContainer: {},
	imageContainer: {
		flexWrap: "wrap",
		justifyContent: "center"
	},
	imageBlock: {
		margin: 10,
		alignItems: "center",
		backgroundColor: "#222",
		borderRadius: 12,
		padding: 8
	},
	image: {
		height: 400,
		width: 400,

		borderRadius: 20,
		marginBottom: 6
	},
	imageDescription: {
		color: "white",
		fontSize: 16,
		textAlign: "center",
		marginBottom: 4
	},
	notesList: {
		marginTop: 2,
		marginBottom: 4,
		alignItems: "flex-start"
	},
	noteItem: {
		color: "white",
		fontSize: 14,
		marginLeft: 4,
		marginBottom: 2
	},
	message: {
		fontSize: 24,
		marginBottom: 10,
		color: "white",
		textAlign: "center"
	}
});

export default StaticScreen;
