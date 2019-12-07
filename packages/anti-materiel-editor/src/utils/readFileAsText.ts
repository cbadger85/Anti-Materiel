export const readFileAsText = (inputFile: File): Promise<string> => {
  const fileReader = new FileReader();

  return new Promise((resolve, reject) => {
    fileReader.onerror = () => {
      fileReader.abort();
      reject(new DOMException('Problem parsing input file.'));
    };

    fileReader.onload = () => {
      resolve(fileReader.result?.toString());
    };
    fileReader.readAsText(inputFile);
  });
};
