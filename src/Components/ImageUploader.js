import React, { useState } from 'react';
import { View, Button, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { uploadImageWithProgress } from '../services/apiService';

const ImageUploader = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});

  const selectImage = async (source) => {
    const options = { mediaType: 'photo', selectionLimit: 10 };
    const response =
      source === 'camera'
        ? await launchCamera(options)
        : await launchImageLibrary(options);

    if (response.assets) {
      setSelectedImages(response.assets);
    }
  };

  const setProgress = (id, progress) => {
    setUploadProgress((prevProgress) => ({ ...prevProgress, [id]: progress }));
  };

  const uploadImages = async () => {
    for (let index = 0; index < selectedImages.length; index++) {
      const image = selectedImages[index];
      console.log('Uploading Image:', image);

     
      await uploadImageWithProgress(image, setProgress, index);
    }

    alert('All images uploaded successfully!');
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => selectImage('camera')}
        >
          <Text style={styles.buttonText}>Open Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => selectImage('gallery')}
        >
          <Text style={styles.buttonText}>Select from Gallery</Text>
        </TouchableOpacity>
      </View>

      {selectedImages.length > 0 && (
        <View style={styles.previewContainer}>
          {selectedImages.map((image, index) => (
            <Image
              key={index}
              source={{ uri: image.uri }}
              style={styles.imagePreview}
            />
          ))}
        </View>
      )}

      <Button
        title={`Upload Images`}
        onPress={uploadImages}
        color="#6200EE"
      />

      {selectedImages.map((image, index) => (
        <Text key={index}>
          {image.fileName}: {uploadProgress[index] || 0}%
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#6200EE',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  previewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  imagePreview: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 10,
  },
});

export default ImageUploader;
