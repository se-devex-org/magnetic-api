import React, { useRef, useState } from 'react';
import { View, Button, Alert } from 'react-native';
import SignatureCapture from 'react-native-signature-capture';
import { recognizeHandwriting } from 'handwriting-recognition-library'; // hypothetical library

const SignatureScreen = () => {
  const signatureRef = useRef(null);
  const [signatureData, setSignatureData] = useState(null);

  const handleSave = () => {
    signatureRef.current.saveImage();
  };

  const handleReset = () => {
    signatureRef.current.resetImage();
  };

  const onSaveEvent = (result) => {
    const { encoded, pathName } = result;
    recognizeHandwriting(encoded)
      .then((digitalSignature) => {
        setSignatureData(digitalSignature);
        Alert.alert('Signature Captured', 'Your signature has been successfully captured.');
      })
      .catch((error) => {
        Alert.alert('Error', 'Failed to capture signature. Please try again.');
      });
  };

  return (
    <View style={{ flex: 1, flexDirection: 'column' }}>
      <SignatureCapture
        style={{ flex: 1 }}
        ref={signatureRef}
        onSaveEvent={onSaveEvent}
        onDragEvent={() => {}}
        showNativeButtons={false}
        showTitleLabel={false}
        viewMode={'portrait'}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <Button title="Save" onPress={handleSave} />
        <Button title="Reset" onPress={handleReset} />
      </View>
    </View>
  );
};

export default SignatureScreen;
