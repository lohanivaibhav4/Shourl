const sessionIdToUserMap = new Map()

export function setUser(sessionId, user){
    sessionIdToUserMap.set(sessionId, user)
}
export function getUser(sessionId, user){
    return sessionIdToUserMap.get(sessionId, user)
}
