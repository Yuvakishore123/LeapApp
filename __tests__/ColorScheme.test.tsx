import React from 'react';

import {ColorSchemeProvider, ColorSchemeContext} from '../ColorSchemeContext'; // Import your ColorSchemeProvider
import {TouchableOpacity, Text, View, TextInput} from 'react-native';
import {fireEvent, render} from '@testing-library/react-native';

import colors from 'constants/colors';

describe('ColorSchemeProvider', () => {
  it('should render with dark color scheme by default', () => {
    const {getByText} = render(
      <ColorSchemeProvider>
        <ColorSchemeContext.Consumer>
          {({colorScheme}) => <Text>Color Scheme: {colorScheme}</Text>}
        </ColorSchemeContext.Consumer>
      </ColorSchemeProvider>,
    );

    const colorSchemeText = getByText('Color Scheme: dark');
    expect(colorSchemeText).toBeTruthy();
  });

  it('should toggle color scheme', () => {
    const {getByText, getByTestId} = render(
      <ColorSchemeProvider>
        <ColorSchemeContext.Consumer>
          {({colorScheme, toggleColorScheme}) => (
            <View>
              <Text testID="color-scheme">{colorScheme}</Text>
              <TouchableOpacity
                testID="toggle-button"
                onPress={toggleColorScheme}>
                <Text>Toggle Color Scheme</Text>
              </TouchableOpacity>
            </View>
          )}
        </ColorSchemeContext.Consumer>
      </ColorSchemeProvider>,
    );

    // Check that the color scheme is initially "dark"
    const colorSchemeText = getByText('dark');
    expect(colorSchemeText).toBeTruthy();

    // Click the button to toggle the color scheme
    const toggleButton = getByTestId('toggle-button');
    fireEvent.press(toggleButton);

    // Check that the color scheme has changed to "light"
    const updatedColorSchemeText = getByTestId('color-scheme');
    expect(updatedColorSchemeText.props.children).toBe('light');
  });
  it('should return blacktheme when colorScheme is "dark"', () => {
    const {getByTestId} = render(
      <ColorSchemeProvider>
        <ColorSchemeContext.Consumer>
          {({getContainerStyle}) => (
            <View testID="container" style={getContainerStyle()} />
          )}
        </ColorSchemeContext.Consumer>
      </ColorSchemeProvider>,
    );

    const container = getByTestId('container');
    expect(container.props.style).toEqual({
      backgroundColor: '#000',
      color: '#F5F5F5',
    });
  });

  it('should return whiteTheme when colorScheme is "light"', () => {
    const {getByTestId} = render(
      <ColorSchemeProvider>
        <ColorSchemeContext.Consumer>
          {({colorScheme, toggleColorScheme, getContainerStyle}) => (
            <View testID="container" style={getContainerStyle()}>
              <Text testID="color-scheme">{colorScheme}</Text>
              <TouchableOpacity
                testID="toggle-button"
                onPress={toggleColorScheme}>
                <Text>Toggle Color Scheme</Text>
              </TouchableOpacity>
            </View>
          )}
        </ColorSchemeContext.Consumer>
      </ColorSchemeProvider>,
    );
    const toggleButton = getByTestId('toggle-button');
    fireEvent.press(toggleButton);

    const container = getByTestId('container');
    expect(container.props.style).toEqual({
      backgroundColor: '#F5F5F5',
      color: '#000',
    });
  });
  it('should return cardColor when colorScheme is "dark"', () => {
    const {getByTestId} = render(
      <ColorSchemeProvider>
        <ColorSchemeContext.Consumer>
          {({
            colorScheme,
            toggleColorScheme,
            getContainerStyle,
            getTextInputStyle,
            getTextColor,
            tabColor,
          }) => (
            <View testID="container" style={getContainerStyle()}>
              <Text testID="tab-color" style={tabColor()}>
                {colorScheme}
              </Text>
              <Text testID="color-scheme" style={getTextColor()}>
                {colorScheme}
              </Text>
              <TouchableOpacity
                testID="toggle-button"
                onPress={toggleColorScheme}>
                <Text>Toggle Color Scheme</Text>
              </TouchableOpacity>
              <TextInput testID="textInput" style={getTextInputStyle()} />
            </View>
          )}
        </ColorSchemeContext.Consumer>
      </ColorSchemeProvider>,
    );

    const textInput = getByTestId('textInput');
    expect(textInput.props.style).toStrictEqual({
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
    });
    const TextColor = getByTestId('color-scheme');
    expect(TextColor.props.style).toStrictEqual({color: 'white'});
    const TabColor = getByTestId('tab-color');
    expect(TabColor.props.style).toStrictEqual({color: 'white'});
  });

  it('should return main when colorScheme is "light"', () => {
    const {getByTestId} = render(
      <ColorSchemeProvider>
        <ColorSchemeContext.Consumer>
          {({
            colorScheme,
            toggleColorScheme,
            getContainerStyle,
            getTextInputStyle,
            getTextColor,
            tabColor,
          }) => (
            <View testID="container" style={getContainerStyle()}>
              <Text testID="tab-color" style={tabColor()}>
                {colorScheme}
              </Text>
              <Text testID="color-scheme" style={getTextColor()}>
                {colorScheme}
              </Text>
              <TouchableOpacity
                testID="toggle-button"
                onPress={toggleColorScheme}>
                <Text>Toggle Color Scheme</Text>
              </TouchableOpacity>
              <TextInput testID="textInput" style={getTextInputStyle()} />
            </View>
          )}
        </ColorSchemeContext.Consumer>
      </ColorSchemeProvider>,
    );
    const toggleButton = getByTestId('toggle-button');
    fireEvent.press(toggleButton);
    const TextColor = getByTestId('color-scheme');
    expect(TextColor.props.style).toStrictEqual({color: 'black'});

    const textInput = getByTestId('textInput');
    expect(textInput.props.style).toStrictEqual({backgroundColor: '#fff'});
    const tabColor = getByTestId('textInput');
    expect(tabColor.props.style).toStrictEqual({backgroundColor: '#fff'});
  });
  it('should return Placeholder when colorScheme is "light"', () => {
    const {getByTestId} = render(
      <ColorSchemeProvider>
        <ColorSchemeContext.Consumer>
          {({
            colorScheme,
            toggleColorScheme,
            getContainerStyle,
            getTextInputStyle,
            getPlaceHolderTextStyle,
            tabColor,
            getButtonColor,
            getPlaceholderTextColor,
            getplaceholdercolor,
          }) => (
            <View testID="container" style={getContainerStyle()}>
              <Text testID="tab-color" style={tabColor()}>
                {colorScheme}
              </Text>
              <Text testID="color-scheme" style={getPlaceHolderTextStyle()}>
                {colorScheme}
              </Text>
              <TouchableOpacity
                testID="toggle-button"
                onPress={toggleColorScheme}>
                <Text>Toggle Color Scheme</Text>
              </TouchableOpacity>
              <Text style={getButtonColor()} testID="Button-Color">
                ButtonColor
              </Text>
              <TextInput testID="textInput" style={getTextInputStyle()} />
              <Text testID="Placeholder-color" style={getplaceholdercolor()}>
                {colorScheme}
              </Text>
              <Text
                testID="Placeholder-Style"
                style={getPlaceholderTextColor()}>
                {colorScheme}
              </Text>
            </View>
          )}
        </ColorSchemeContext.Consumer>
      </ColorSchemeProvider>,
    );
    const toggleButton = getByTestId('toggle-button');
    fireEvent.press(toggleButton);
    const TextColor = getByTestId('color-scheme');
    expect(TextColor.props.style).toStrictEqual({color: 'black'});

    const textInput = getByTestId('textInput');
    expect(textInput.props.style).toStrictEqual({backgroundColor: '#fff'});
    const tabColor = getByTestId('textInput');
    expect(tabColor.props.style).toStrictEqual({backgroundColor: '#fff'});
    const ButtonColor = getByTestId('Button-Color');
    expect(ButtonColor.props.style).toStrictEqual({
      color: '#000',
    });
    const placeholderStyle = getByTestId('Placeholder-Style');
    expect(placeholderStyle.props.style).toStrictEqual({
      color: '#000',
    });
    const placeholderColor = getByTestId('Placeholder-color');
    expect(placeholderColor.props.style).toStrictEqual({
      color: '#666',
    });
  });
  it('should return Placeholder when colorScheme is "dark"', () => {
    const {getByTestId} = render(
      <ColorSchemeProvider>
        <ColorSchemeContext.Consumer>
          {({
            colorScheme,
            toggleColorScheme,
            getContainerStyle,
            getTextInputStyle,
            getTextColor,
            getPlaceHolderTextStyle,
            getButtonColor,
            getPlaceholderTextColor,
            getplaceholdercolor,
          }) => (
            <View testID="container" style={getContainerStyle()}>
              <Text testID="Placeholder" style={getPlaceHolderTextStyle()}>
                {colorScheme}
              </Text>
              <Text testID="Placeholder-color" style={getplaceholdercolor()}>
                {colorScheme}
              </Text>
              <Text
                testID="Placeholder-Style"
                style={getPlaceholderTextColor()}>
                {colorScheme}
              </Text>

              <Text testID="color-scheme" style={getTextColor()}>
                {colorScheme}
              </Text>
              <Text style={getButtonColor()} testID="Button-Color">
                ButtonColor
              </Text>

              <TouchableOpacity
                testID="toggle-button"
                onPress={toggleColorScheme}>
                <Text>Toggle Color Scheme</Text>
              </TouchableOpacity>
              <TextInput testID="textInput" style={getTextInputStyle()} />
            </View>
          )}
        </ColorSchemeContext.Consumer>
      </ColorSchemeProvider>,
    );
    const ButtonColor = getByTestId('Button-Color');
    expect(ButtonColor.props.style).toStrictEqual({
      color: colors.buttonColor,
    });

    const textInput = getByTestId('textInput');
    expect(textInput.props.style).toStrictEqual({
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
    });
    const TextColor = getByTestId('Placeholder');
    expect(TextColor.props.style).toStrictEqual({
      color: 'rgba(255, 255, 255, 0.2)',
    });
    const placeholderStyle = getByTestId('Placeholder-Style');
    expect(placeholderStyle.props.style).toStrictEqual({
      color: 'rgba(255, 255, 255, 0.5)',
    });
    const placeholderColor = getByTestId('Placeholder-color');
    expect(placeholderColor.props.style).toStrictEqual({
      color: 'rgba(255, 255, 255, 0.5)',
    });
  });
});
