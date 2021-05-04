import { nanoid } from "nanoid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  projectAuth,
  projectFirestore,
  userCollectionRef,
  userIdMapperRef,
} from "..";
import {
  action$login,
  action$logout,
} from "../redux/reducers/applicationState";
import { action$resetUser, action$setUser } from "../redux/reducers/user";

function useLoginAuthWatcher() {
  const dispatch = useDispatch();

  const { isLoggedIn } = useSelector((state: RootState) => state.application);
  const { email } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    let unsubscribe: (() => void) | null = projectAuth.onAuthStateChanged(
      async (user) => {
        if (user && user.email) {
          // Saving User Reference
          const userMapperRef = userIdMapperRef.doc(user.email);

          // Fetch Id from DB.
          const userMapperObject = await userMapperRef.get();
          const userData: FirestoreUser = {
            id: nanoid(),
            email: user.email,
            friends: [],
            pendingRequest: [],
            sendRequest: [],
            name: user.displayName || "",
            profilePhoto: user.photoURL || "",
          };
          if (!userMapperObject.exists) {
            const userDocumentRef = userCollectionRef.doc(userData.id);

            // Creating Batch Request
            const batch = projectFirestore.batch();

            // Setting User Profile & Profile Matcher in Batch
            batch.set(userDocumentRef, userData as FirestoreUser);
            batch.set(userMapperRef, {
              id: userData.id,
            });

            await batch.commit();
          } else {
            userData.id = (userMapperObject.data() as { id: string }).id;
          }
          dispatch(action$setUser(userData));
          dispatch(action$login(null));
        } else {
          dispatch(action$resetUser(null));
          dispatch(action$logout(null));
        }
      }
    );
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [isLoggedIn, email, dispatch]);
}

export { useLoginAuthWatcher };
