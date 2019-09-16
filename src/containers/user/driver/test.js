import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet
} from 'react-native';
import { ListItem } from 'react-native-elements';

class Users extends React.Component {
  state = {
    seed: 1,
    page: 1,
    users: [],
    isLoading: false,
    isRefreshing: false,
  };

  loadUsers = () => {
    const { users, seed, page } = this.state;
    this.setState({ isLoading: true });

    fetch(`https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`)
      .then(res => res.json())
      .then(res => {
        this.setState({
          users: page === 1 ? res.results : [...users, ...res.results],
          isRefreshing: false,
        });
      })
      .catch(err => {
        console.error(err);
      });
  };

  handleRefresh = () => {
    this.setState({
      seed: this.state.seed + 1,
      isRefreshing: true,
    }, () => {
      this.loadUsers();
    });
  };

  handleLoadMore = () => {
    this.setState({
      page: this.state.page + 1
    }, () => {
      this.loadUsers();
    });
  };

  componentDidMount() {
    this.loadUsers();
  };

  render() {
    const { users, isRefreshing } = this.state;

    return (
      <View style={s.scene}>
        {
          users &&
            <FlatList
              data={users}
              renderItem={({item}) => (
                <ListItem
                  roundAvatar
                  title={item.name.first}
                  subtitle={item.email}
                  avatar={{uri: item.picture.thumbnail}}
                />
              )}
              keyExtractor={i => i.email}
              refreshing={isRefreshing}
              onRefresh={this.handleRefresh}
              onEndReached={this.handleLoadMore}
              onEndThreshold={0}
            />
        }
      </View>
    )
  }
}

const s = StyleSheet.create({
  scene: {
    flex: 1,
    paddingTop: 25,
  },
  user: {
    width: '100%',
    backgroundColor: '#333',
    marginBottom: 10,
    paddingLeft: 25,
  },
  userName: {
    fontSize: 17,
    paddingVertical: 20,
    color: '#fff'
  }
});

export default Users;