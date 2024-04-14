export const getButtons = (buttonsMatrix) => {
  return {
    keyboard: buttonsMatrix.map(row => row.map(btn => ({
      text: btn,
    }))),
    selective: true
  }
};
