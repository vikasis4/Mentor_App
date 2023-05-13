import React, { useEffect } from 'react'
import { StyleSheet, Text, View, StatusBar, ScrollView, Button } from 'react-native'
import TopMenuInfo from '../../components/TopMenuInfo'
import { StudentContext } from '../../context/Students'
import Map from './Map'
var toks = 'cRk6Th18Q6GU3FV4xS-J2e:APA91bEWALbC7YgUi75lsHhQQ5DI-F5qP7Ub2z3wOTzDp0dfiJjPk4oAV1l-6kGJOJmMUD3-tcbwBt9sQru-Z0iZsPvalVU_3j_stXhmIaBQic5vXSahzGAv2E9hV1F3TXmwq6rR_sR5'

const Pending = (props: any) => {

  const student = React.useContext(StudentContext);
  const [list, setList] = React.useState<any>();

  React.useEffect(() => {
    if (student.state) {
      setList((student.pending).map((data: any) => { return <Map data={data} key={(Math.random() * 10000).toString()} /> }))
    }
  }, [student])



  return (
    <>
      <StatusBar animated={true} barStyle='dark-content' backgroundColor='white' />
      <TopMenuInfo data={{ name: "Pending", count: student.pending.length }} />
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.list}>
          {list}
        </View>
      </ScrollView>
    </>
  )
}

export default Pending

const styles = StyleSheet.create({
  list: {
    gap: 18,
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
})