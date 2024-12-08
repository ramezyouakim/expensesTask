import React, { useState } from 'react';
import { TextInput as RTextInput, View, Text } from 'react-native';
import styled from 'styled-components/native';

type TextInputProps = {
  label: string
  placeholder?: string
  validationError?: string
  validator: (text: string) => boolean
  onTextChange: (text: string) => void
  secureTextEntry?: boolean
  editable?: boolean
  multiline?: boolean
  containerProps?: {}
  preDefinedValue?: string
}

const TextInput = ({
  label,
  placeholder,
  validationError,
  validator,
  onTextChange,
  secureTextEntry = false,
  editable = true,
  multiline = false,
  containerProps,
  preDefinedValue
}: TextInputProps) => {
  const [value, setValue] = useState(preDefinedValue || '');
  const [isValid, setIsValid] = useState(true);

  const handleChange = (text: string) => {
    setValue(text);
    onTextChange(text);
  };

  const handleValidation = () => {
    setIsValid(validator(value));
  };

  return (
    <View {...containerProps}>
      <Text>{label}</Text>
      <Input
        editable={editable}
        multiline={multiline}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        onChangeText={handleChange}
        onBlur={handleValidation}
        value={value}
        isValid={isValid}
      />
      {!isValid && <ErrorMessage>{validationError || "Invalid Input"}</ErrorMessage>}
    </View>
  );
};

type RTextInputProps = {
  isValid: boolean
  editable: boolean
}

const Input = styled(RTextInput)<RTextInputProps>(({ isValid, theme, editable }) => ({
  paddingTop: theme.rems.x2,
  borderBottomWidth: editable ? 1 : 0,
  borderColor: isValid ? 'lightgray' : 'red',
}));

const ErrorMessage = styled.Text({
  color: 'red'
});

export default TextInput;
