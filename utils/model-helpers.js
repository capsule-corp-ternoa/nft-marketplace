/**
 * Function onModelOpen
 * Set the model-open class on body.
 * Which set the `overflow:hidden;` property on the body.
 */
export function onModelOpen() {
  document.body.classList.add('model-open');
}

/**.
 * Function onModelClose
 * Remove the model-open class from body.
 */
export function onModelClose() {
  document.body.classList.remove('model-open');
}
