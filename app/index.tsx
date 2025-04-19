import { ShortList } from "@/components/Shortlist";
import { Text, View } from "@/components/Themed";
import { getPosts } from "@/lib/APIphoto";
import { IPost } from "@/lib/types";
import { getRelativeTime } from "@/lib/util";
import { Image } from "expo-image";
import React, { useEffect, useState } from "react";
import { Linking, Pressable, ScrollView, StyleSheet } from "react-native";

const LogScreen = () => {
	const [loading, setLoading] = useState(true);
	const [posts, setPosts] = useState([]);

	const postsRead = (postsDB) => {
		setPosts(postsDB);
		setLoading(false);
	};

	useEffect(() => {
		const unsubscribe = getPosts(postsRead);
		return () => {
			unsubscribe;
		};
	}, []);

	const profilePic = () => {
		return (
			<View style={styles.profilePicContainer}>
				<Image
					style={styles.profilePhoto}
					source={
						"https://firebasestorage.googleapis.com/v0/b/builder-403d5.appspot.com/o/project%2F202501%2F1152af2d-d660-4552-87cf-c19943c16a7f_600x600?alt=media&token=4389c7fe-9785-46e1-aac5-f8b78acf0efb"
					}
				/>
			</View>
		);
	};

	function insert600Size(url) {
		return url.replace(/(\?alt=.*)/, "_600x600$1");
	}

	function renderRow(data: IPost) {
		const backgroundColor = "black";

		return (
			<View style={styles.outerView} key={data.key}>
				<Pressable
					onPress={() => {
						if (data.linkURL) {
							Linking.openURL(data.linkURL);
						}
					}}>
					<View style={styles.textContainer}>
						<Text style={styles.message}>{data.caption?.trim() || ""}</Text>
						<Text style={styles.messageSmall}>{getRelativeTime(data.timestamp?.toDate()?.getTime() ?? 0)}</Text>
					</View>
					<View style={styles.photoContainer}>
						{data.images && data.images.length > 0 ? (
							<View style={styles.imageContainer}>
								{data.images.slice(0, 3).map((image, index) => (
									<Image key={index} source={{ uri: insert600Size(image.url) }} style={styles.image} />
								))}
							</View>
						) : (
							<View style={styles.noPhotoContainer}>
								<Text style={styles.noPhoto}>Aún no hay fotos. Inténtalo de nuevo más tarde esta noche.</Text>
								<Text style={styles.noPhoto}>No photos yet - Check back later tonight.</Text>
							</View>
						)}
					</View>
				</Pressable>
			</View>
		);
	}
	return (
		<View style={styles.container}>
			<ScrollView style={styles.logList}>
				<View style={styles.avatarAContainer}>
					<View style={styles.avatarBView}>{profilePic()}</View>
				</View>
				{loading === false && (
					<View style={styles.avatarAContainer}>
						<ShortList data={posts} renderItem={renderRow} />
					</View>
				)}
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	avatar: {
		marginRight: 12,
		width: 50
	},
	image: {
		height: 220,
		width: 220,
		paddingRight: 5,
		marginRight: 5,
		borderRadius: 5
	},

	imageContainer: {
		flexDirection: "row"
	},
	avatarFace: { borderRadius: 48 / 2, height: 48, width: 48 },

	avatarIcon: {
		fontSize: 35,
		paddingTop: 5,
		textAlign: "center"
	},
	container: {
		flex: 1,
		height: 200,
		backgroundColor: "black"
	},

	logList: {
		paddingBottom: 50
	},
	noPhotoContainer: {
		padding: 10,
		textAlign: "center",
		paddingBottom: 20
	},
	noPhoto: {
		fontSize: 16,
		textAlign: "center",
		color: "white"
	},
	message: {
		fontSize: 24,
		marginBottom: 5,
		color: "white"
	},
	messageSmall: {
		color: "grey",
		fontSize: 14,
		paddingTop: 5
	},

	outerView: {
		borderColor: "#CED0CE",
		borderWidth: StyleSheet.hairlineWidth,
		flexDirection: "row",
		paddingVertical: 8,
		padding: 8,
		borderRadius: 48 / 2,
		marginBottom: 20,
		backgroundColor: "#282828"
	},
	textContainer: {
		padding: 10
	},
	photoContainer: {},
	profilePicContainer: {
		alignItems: "center",
		paddingBottom: 50,
		paddingHorizontal: 15,
		paddingTop: 15
	},
	profilePhoto: {
		borderColor: "grey",
		borderRadius: 8, // Changed from 150/2 to 8 for slightly rounded corners
		height: 150,
		overflow: "hidden",
		width: 150
	},
	avatarAContainer: {
		alignItems: "center",
		justifyContent: "center",
		paddingTop: 20
	},
	avatarBView: {}
});

export default LogScreen;
