import sendRequest from "../utils/sendRequest";

export function getRooms() {
  return sendRequest(`/rooms`);
}
