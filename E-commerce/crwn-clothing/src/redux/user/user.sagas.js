import { takeLatest, put, all, call } from "redux-saga/effects";

import { auth, googleProvider, createUserProfileDocument, getCurrentUser } from "../../firebase/firebase.utils";

import { SignInSuccess, SignInFailure, SignOutSuccess, SignOutFailure, signUpSuccess, signUpFailure} from "./user.actions";

import UserActionTypes  from "./user.types";


export function* getSnapshotFromUserAuth(userAuth, additionalData) {
    try {
        const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
        const userSnapshot = yield userRef.get();
        yield put(SignInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }) );
    } catch (error) {
        yield put(SignInFailure(error));
    }
}

export function* signInWithGoogle() {
    try {
        const { user } = yield auth.signInWithPopup(googleProvider);
        yield getSnapshotFromUserAuth(user);
    } catch (error) {
        yield put(SignInFailure(error));
    }
};

export function* signWithEmail({payload: {email, password}}) {
    try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapshotFromUserAuth(user);
    } catch (error) {
        yield put(SignInFailure(error));
    }
};

export function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentUser();
        if (!userAuth) return;
        yield getSnapshotFromUserAuth(userAuth);
    } catch (error) {
        yield put(SignInFailure(error));
    }
};

export function* signOut() {
    try { 
        yield auth.signOut();
        yield put(SignOutSuccess());
    } catch (error) {
        yield put(SignOutFailure(error));
    }
};

export function* signUp({ payload: { email, password, displayName} }) {
    try {
        const { user } = yield auth.createUserWithEmailAndPassword(email, password);
        yield put(signUpSuccess({ user, aditionalData: { displayName } }));
    } catch (error) {
        yield put(signUpFailure(error));
    }
};

export function* signInAfterSignUp({ payload: { user, aditionalData } }) {
    yield getSnapshotFromUserAuth(user, aditionalData);
}

export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
};

export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signWithEmail)
};

export function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
};

export function* onSignOutStart() {
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut)
};

export function* onSignUpStart() {
    yield takeLatest(UserActionTypes.SIGN_UP_START, signUp)
};

export function* onSignUpSuccess() {
    yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp)
}

export function* userSagas() {
    yield all([
        call(onGoogleSignInStart), 
        call(onEmailSignInStart), 
        call(onCheckUserSession),
        call(onSignOutStart),
        call(onSignUpStart),
        call(onSignUpSuccess)
    ])
};