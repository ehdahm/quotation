import * as roomsApi from "../apis/rooms";

export async function getRooms() {
  try {
    const rooms = await roomsApi.getRooms();
    return rooms;
  } catch (error) {
    console.error("Error fetching room:", error);
    throw error;
  }
}
