import {
  DndContext,
  DragOverlay,
  MouseSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import image1 from "../public/images/image-1.webp";
import image2 from "../public/images/image-2.webp";
import image3 from "../public/images/image-3.webp";
import image4 from "../public/images/image-4.webp";
import image5 from "../public/images/image-5.webp";
import image6 from "../public/images/image-6.webp";
import image7 from "../public/images/image-7.webp";
import image8 from "../public/images/image-8.webp";
import image9 from "../public/images/image-9.webp";
import Item from "./components/Item";
import Sortable from "./components/Sortable";

const imgData = [
  {
    id: "1",
    img: image1,
    isSelected: false,
  },
  {
    id: "2",
    img: image2,
    isSelected: false,
  },
  {
    id: "3",
    img: image3,
    isSelected: false,
  },
  {
    id: "4",
    img: image4,
    isSelected: false,
  },
  {
    id: "5",
    img: image5,
    isSelected: false,
  },
  {
    id: "6",
    img: image6,
    isSelected: false,
  },
  {
    id: "7",
    img: image7,
    isSelected: false,
  },
  {
    id: "8",
    img: image8,
    isSelected: false,
  },
  {
    id: "9",
    img: image9,
    isSelected: false,
  },
];

export default function App() {
  const [images, setImages] = useState(imgData);
  const [activeId, setActiveId] = useState(null);

  /**
   * Sensors Configuration for Drag and Drop Interactions.
   *
   * This configuration sets up sensors for drag and drop interactions, specifically
   * utilizing the MouseSensor. The MouseSensor is configured with an activation
   * constraint of 5 pixels, ensuring drag gestures are activated with a minimal
   * movement distance. This configuration enables smooth and responsive drag and
   * drop interactions using the mouse input, enhancing user experience in the application.
   *
   * @constant {Array} sensors - Array of sensors for drag and drop interactions.
   */
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } })
  );

  /**
   * Handle Drag Start Event.
   *
   * This function is called when a drag operation starts. It captures the ID of the
   * actively dragged item and updates the component's state with the active item's ID.
   *
   * @param {object} e - The event object representing the drag start event.
   */
  const handleDragStart = (e) => {
    setActiveId(e.active.id);
  };

  /**
   * Handle Drag End Event.
   *
   * This function is called when a drag operation ends. It checks if the actively dragged
   * item is dropped over a different item, and if so, it reorders the images array by moving
   * the active item to the new position determined by the drop target. The updated images
   * array is then set in the component's state.
   *
   * @param {object} e - The event object representing the drag end event.
   */
  const onDragEndHandler = (e) => {
    const { active, over } = e;

    // Check if the actively dragged item is dropped over a different item
    if (active.id !== over.id) {
      setImages((items) => {
        const activeIndex = images.findIndex((item) => item.id === active.id);
        const overIndex = images.findIndex((item) => item.id === over.id);

        // Reorder the images array by moving the active item to the new position determined by the drop target
        return arrayMove(items, activeIndex, overIndex);
      });
    }
  };

  /**
   * Handle Drag Cancel Event.
   *
   * This function is called when a drag operation is canceled. It resets the active item's ID
   * in the component's state to null, indicating that the drag operation has been canceled and
   * there is no active item being dragged.
   */
  const handleDragCancel = () => {
    setActiveId(null);
  };

  /**
   * Handle Image Deletion.
   *
   * This function is called when the user initiates the deletion of selected images. It filters
   * the images array to retain only the items that are not selected for deletion. The updated
   * images array, excluding the selected items, is then set in the component's state.
   */
  const handleImageDelete = () => {
    const selectedItems = images.filter((el) => el.isSelected === true);

    const newItems = images.filter((item) => !selectedItems.includes(item));

    setImages(newItems);
  };

  /**
   * Handle Selection of Gallery Items.
   *
   * This function is called when a gallery item is selected or deselected. It updates the
   * `isSelected` property of the specific image with the given ID based on the checkbox state.
   * The updated images array with the modified selection status is then set in the component's state.
   *
   * @param {object} e - The event object representing the checkbox change event.
   * @param {number} id - The ID of the image being selected or deselected.
   */
  const handleSelectItem = (e, id) => {
    const { checked } = e.target;
    const newItems = [...images];
    const findInx = images.findIndex((img) => img.id === id);
    newItems[findInx].isSelected = checked;
    setImages(newItems);
  };

  /**
   * Calculate Selected Items in the Gallery.
   *
   * This function filters the `images` array to identify and return the items that are currently
   * selected (where the `isSelected` property is true). It calculates and returns an array containing
   * the selected items in the gallery.
   *
   * @returns {Array} An array containing the selected items in the gallery.
   */
  const totalSelectItems = () =>
    images.filter((img) => img.isSelected === true);

  return (
    <section className="w-screen h-screen flex items-center justify-center overflow-x-hidden">
      <div className="container mx-auto rounded-lg shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]">
        <div className="flex items-center justify-between px-8 border-b-2 pt-10 sm:pt-3 pb-3">
          {/* Conditional Rendering based on Selected Files */}
          {totalSelectItems().length > 0 ? (
            <>
              {/* If there are selected files */}
              <span className="text-2xl">
                {totalSelectItems().length} Selected File
              </span>
              <span
                className="text-lg text-red-500 font-medium capitalize cursor-pointer"
                onClick={handleImageDelete}
              >
                Delete files
              </span>
            </>
          ) : (
            <h2 className="text-2xl font-medium text-gray-800">Gallery</h2>
          )}
        </div>
        <div className="grid grid-cols-12 sm:grid-cols-10 gap-3 md:gap-6 px-5 md:px-8 py-8 md:py-10">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={onDragEndHandler}
            onDragStart={handleDragStart}
            onDragCancel={handleDragCancel}
          >
            <SortableContext items={images} strategy={rectSortingStrategy}>
              {images.map((img, index) => (
                <Sortable
                  handleSelectItem={handleSelectItem}
                  key={img.id}
                  data={img}
                  index={index}
                  uid={img.id}
                />
              ))}
            </SortableContext>

            <DragOverlay adjustScale>
              {activeId ? (
                <Item
                  index={activeId}
                  data={images.find((itm) => itm.id === activeId)}
                  isDragging
                />
              ) : null}
            </DragOverlay>
          </DndContext>

          <div className="col-span-2 w-full h-full flex items-center justify-center border border-dashed rounded-[10px] overflow-hidden">
            <div className="flex flex-col items-center justify-center">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  className="h-10 w-10"
                >
                  <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                  <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z" />
                </svg>
              </span>
              <span className="mt-3">Add Images</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}