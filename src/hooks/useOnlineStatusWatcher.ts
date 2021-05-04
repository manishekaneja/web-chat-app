import { useEffect, useState } from "react";
import { projectRealTime } from "..";

function useOnlineStatusWatcher(id: string) {
  const [isOnline, setIsOnline] = useState(false);
  useEffect(() => {
    let statusRef: any = null;
    if (id) {
      statusRef = projectRealTime.ref("/chat-app/users/"+id);
      statusRef.on("value", (snapshot: any) => {
        setIsOnline(snapshot.val());
        console.log(snapshot.val(), snapshot);
      });
    }
    return () => {
      if (id && statusRef) {
        statusRef.off();
      }
    };
  }, [id]);
  return isOnline;
}
export { useOnlineStatusWatcher };
