import React from 'react'
import { StyleSheet, Text, View, StatusBar, ScrollView } from 'react-native'
import TopMenuInfo from '../../components/TopMenuInfo'
import { font } from '../../variables/files'
import { StudentContext } from '../../context/Students'
import Map from './Map'

const Pending = (props: any) => {

  const student = React.useContext(StudentContext);
  const [list, setList] = React.useState<any>();


  React.useEffect(() => {
    if (student.news.length > 0) {
      setList((student.news).map((data: any) => { return <Map data={data} key={(Math.random() * 10000).toString()} /> }))
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