import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, RefreshControl } from 'react-native';
import { fetchTopHeadlines } from '../api/newsApi';
import NewsItem from '../components/NewsItem';

const HomeScreen = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const loadNews = async (isRefresh = false) => {
    try {
      if (!isRefresh) setLoading(true);
      setError(null);
      const articles = await fetchTopHeadlines();
      setNews(articles);
    } catch (err) {
      setError('Failed to load news');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadNews();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadNews(true);
  };

  const renderItem = ({ item }) => (
    <NewsItem title={item.title} imageUrl={item.urlToImage} />
  );

  if (loading && !refreshing && news.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#1976d2" />
        <Text style={styles.loadingText}>Loading news...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
      <FlatList
        data={news}
        keyExtractor={(item, index) => item.url || String(index)}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={news.length === 0 && styles.center}
        ListEmptyComponent={
          !loading && (
            <Text style={styles.emptyText}>No news available.</Text>
          )
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 8,
    fontSize: 14,
    color: '#555555',
  },
  errorText: {
    padding: 8,
    textAlign: 'center',
    color: '#d32f2f',
    fontWeight: '500',
  },
  emptyText: {
    fontSize: 16,
    color: '#555555',
  },
});

export default HomeScreen;

