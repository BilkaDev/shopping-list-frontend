import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Box, Button, Img, VStack } from '@chakra-ui/react';
import { ImageUploadProps } from './FormElements.types';

export const ImageUpload = ({
  setImage,
  setIsValid,
  defaultImage,
  image,
}: ImageUploadProps) => {
  const [file, setFile] = useState<Blob | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | ArrayBuffer | null>();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const filePickerRef = useRef<HTMLInputElement>(null);

  const pickedHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let pickedFile;
    if (e.target.files && e.target.files.length === 1) {
      pickedFile = e.target.files[0];
      if (pickedFile.name.match(/\.png|\.jpg|\.jpeg/i) !== null) {
        setFile(pickedFile);
        setIsValid(true);
        setImage(pickedFile);
      } else {
        setIsValid(false);
      }
    }
  };

  const pickImageHandler = () => {
    if (filePickerRef.current) {
      filePickerRef.current.click();
    }
  };
  return (
    <Box m="1rem">
      <input
        ref={filePickerRef}
        style={{ display: 'none' }}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />
      <VStack justify="center" align="center">
        <Box w="16rem" h="16rem" border="1px solid #ccc" mb="1rem">
          <Img
            objectFit="contain"
            w="100%"
            h="100%"
            src={previewUrl ? (previewUrl as string) : image}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = defaultImage;
            }}
            alt="Preview logo image"
          />
        </Box>
        <Button colorScheme="whiteAlpha" onClick={pickImageHandler}>
          PICK IMAGE
        </Button>
      </VStack>
    </Box>
  );
};
