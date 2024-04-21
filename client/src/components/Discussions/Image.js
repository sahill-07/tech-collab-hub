import man1 from './ImageAssets/avatar.png';
import man2 from './ImageAssets/hacker.png';
import man3 from './ImageAssets/man -1.png';
import man4 from './ImageAssets/man 2.png';
import man5 from './ImageAssets/man 3.png';
import man6 from './ImageAssets/man 4.png';
import man7 from './ImageAssets/man 5.png';
import man8 from './ImageAssets/man.png';
import man9 from './ImageAssets/profile.png';
import man10 from './ImageAssets/programmer.png';

const imagesArray = [man1, man2, man3, man4, man5, man6, man7, man8, man9, man10];

// Function to get a random image path
export const getRandomImage = () => {
  const randomIndex = Math.floor(Math.random() * imagesArray.length);
  return imagesArray[randomIndex];
};

// Exporting the images array as well
export { imagesArray };