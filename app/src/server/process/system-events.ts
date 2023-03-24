import { prisma } from "../db";
// import { sendSystemMessage } from "./notifications/contact-us-message";
import { format } from "date-fns";

export const addSystemEvent = async (
  subject: string,
  details: any,
  notify?: boolean
  // eslint-disable-next-line @typescript-eslint/require-await
) => {
  /*
  const answer = await prisma.systemEvents.create({
    data: {
      subject,
      details,
    },
  });

  if (notify) {
    // await sendSystemMessage(
    //   subject,
    //   answer.id,
    //   format(new Date(), "HH:mm:ss X")
    // );
  }

  return answer.id;
  */

  // This is place holder for later development
  return "TBD";
};
