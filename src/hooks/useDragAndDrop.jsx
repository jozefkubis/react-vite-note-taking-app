import { useState } from "react"

function useDragAndDrop(items, setItems, storageKey) {
  const [dragging, setDragging] = useState(null)

  const handleDragStart = (index) => {
    setDragging(index)
  }

  const handleDragEnter = (index) => {
    if (dragging === index) return

    let updatedItems = [...items]
    const draggedItem = updatedItems.splice(dragging, 1)[0]
    updatedItems.splice(index, 0, draggedItem)

    setDragging(index)
    setItems(updatedItems)
  }

  const handleDragEnd = () => {
    setDragging(null)
    localStorage.setItem(storageKey, JSON.stringify(items))
  }

  return {
    handleDragStart,
    handleDragEnter,
    handleDragEnd,
  }
}

export default useDragAndDrop
