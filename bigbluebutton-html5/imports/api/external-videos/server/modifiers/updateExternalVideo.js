import { check } from 'meteor/check';
import Logger from '/imports/startup/server/logger';
import ExternalVideoStreamer from '/imports/api/external-videos/server/streamer';

export default function updateExternalVideo(meetingId, userId, status, rate, time, state) {
  check(meetingId, String);
  check(status, String);
  check(userId, String);
  check(rate, Number);
  check(time, Number);
  check(state, Number);

  const modifier = {
    meetingId,
    userId,
    rate,
    time,
    state,
  };

  try {
    Logger.debug(`UpdateExternalVideoEvtMsg received for user ${userId} and meeting ${meetingId} event:${status}`);
    ExternalVideoStreamer(meetingId).emit(status, modifier);
  } catch (err) {
    Logger.error(`Error on setting shared external video update in Meetings collection: ${err}`);
  }
}
