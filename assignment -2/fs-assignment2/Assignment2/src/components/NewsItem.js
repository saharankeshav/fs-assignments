import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const NewsItem = ({ title, imageUrl }) => {
  return (
    <View style={styles.container}>
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.image} />
      ) : (
        <View style={[styles.image, styles.placeholder]} />
      )}
      <View style={styles.textContainer}>
        <Text numberOfLines={2} style={styles.title}>
          {title}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
    backgroundColor: '#ffffff',
  },
  image: {
    width: 90,
    height: 70,
    borderRadius: 8,
    backgroundColor: '#ddd',
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222222',
  },
});

export default NewsItem;

