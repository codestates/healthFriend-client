const getUnreadCount = (array) => array.filter((elm) => !elm.checked).length;

export default getUnreadCount;
