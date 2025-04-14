import { defineState } from '@lwc/state';

const oanToRid = new Map([
    ['Mike', 'mike-id'],
    ['Jose', 'jose-id']
])
export default defineState((atom, computed, update, fromContext, setAtom) => (initialRoute = 'Mike') => {
  const currentRoute = atom(initialRoute);
  const objectApiName = atom(initialRoute);
  const recordId = atom(oanToRid.get(initialRoute))

  const navigateTo = (newRoute) => {
    setAtom(currentRoute, newRoute);
    setAtom(objectApiName, newRoute);
    setAtom(recordId, oanToRid.get(newRoute));
  };

  return {
    currentRoute,
    objectApiName,
    recordId,
    navigateTo,
  };
});
