import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { projectRealTime, userCollectionRef } from "..";
import { action$setLink } from "../redux/reducers/links";
import { action$setUser } from "../redux/reducers/user";

function useProfileWatcher() {
  const dispatch = useDispatch();

  const { isLoggedIn } = useSelector((state: RootState) => state.application);
  const user = useSelector((state: RootState) => state.user);
  const { id } = user;
  useEffect(() => {
    let unsubscribeUserDetails: (() => void) | null = null;
    if (isLoggedIn && id && typeof id === "string" && id.trim()!=="" ) {
      unsubscribeUserDetails = userCollectionRef
        .doc(id)
        .onSnapshot({ includeMetadataChanges: true }, (userObject) => {
          if (!userObject.exists) {
            throw new Error("User Not Found");
          } else {
            const userData: User = {
              id: id,
              email: "",
              status: "unknown",
              friends: [],
              pendingRequest: [],
              sendRequest: [],
              name: "",
              profilePhoto: "",
              ...userObject.data(),
            };
            console.log(userData);
            const searchMap: Record<
              string,
              "friend" | "recievedRequest" | "sendRequest"
            > = {};

            userData.friends.forEach((singlePerson) => {
              searchMap[singlePerson.email] = "friend";
            });
            userData.pendingRequest.forEach((singlePerson) => {
              searchMap[singlePerson.email] = "recievedRequest";
            });
            userData.sendRequest.forEach((singlePerson) => {
              searchMap[singlePerson.email] = "sendRequest";
            });
            dispatch(action$setLink(searchMap));
            dispatch(action$setUser(userData));
          }
        });
      const statusRef = projectRealTime.ref("/chat-app/users/" + id);
      statusRef.set(true);
      statusRef.onDisconnect().set(false);
    }
    return () => {
      if (unsubscribeUserDetails) {
        unsubscribeUserDetails();
      }
    };
  }, [isLoggedIn, dispatch, id]);
}

export { useProfileWatcher };
