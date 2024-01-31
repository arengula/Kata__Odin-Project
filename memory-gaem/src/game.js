function historyItem(value) {
    this.value = value;
    this.next = null;
    this.previous = null;
}

historyItem.prototype.setValue = function(newValue) {
    this.value = newValue;
}
historyItem.prototype.getValue = function() {
    return this.value;
}

historyItem.prototype.setNext = function(nextItem) {
    this.next = nextItem;
}
historyItem.prototype.getNext = function() {
    return this.next;
}

historyItem.prototype.setPrev = function(prevItem) {
    this.previous = prevItem;
}
historyItem.prototype.getPrev = function() {
    return this.previous;
}

function cardHistory(maxSize) {
    const MAX_SIZE = maxSize;
    let historyHead = null;
    let historyTail = null;

    const add = (itemValue) => {
        const newItem = new historyItem(itemValue);
        let counter = 0;
        let noDuplicate = true
        let historyPtr = historyHead;

        while (historyPtr !== null &&
            counter < MAX_SIZE &&
            noDuplicate
        ) {
            counter++;
            noDuplicate = newItem.getValue() !== historyPtr.getValue();
            historyPtr = historyPtr.getNext();
        }

        if (noDuplicate) {
            if (counter == 0) {
                historyTail = newItem
                historyHead = newItem
            } else if (counter != MAX_SIZE) {
                newItem.setNext(historyHead)
                historyHead.setPrev(newItem)
                historyHead = newItem
            } else {
                newItem.setNext(historyHead)
                historyHead.setPrev(newItem)
                historyHead = newItem

                historyTail = historyTail.getPrev()
                historyTail.getNext().setPrev(null)
                historyTail.setNext(null)
            }
            return 0;
        }

        return -1;
    }

    return { add }
}

export default cardHistory;
