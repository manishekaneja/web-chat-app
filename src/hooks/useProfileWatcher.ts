import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { projectRealTime, userCollectionRef } from "..";
import { action$setUser } from "../redux/reducers/user";

function useProfileWatcher() {
  const dispatch = useDispatch();

  const { isLoggedIn } = useSelector((state: RootState) => state.application);
  const { id } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    let unsubscribeUserDetails: (() => void) | null = null;
    console.log(id);
    if (isLoggedIn && id) {
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
