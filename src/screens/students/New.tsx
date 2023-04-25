import { StyleSheet, ScrollView, View } from 'react-native'
import React from 'react'
import TopMenuInfo from '../../components/TopMenuInfo'
import { StudentContext } from '../../context/Students'
import Map from './Map'

const New = () => {

  const student = React.useContext(StudentContext);
  const [list, setList] = React.useState<any>();

  React.useEffect(() => {
    if (student.news.length > 0) {
      setList((student.news).map((data: any) => { return <Map data={data} key={(Math.random() * 10000).toString()} /> }))
    }
  }, [student])

  return (
    <>
      <TopMenuInfo data={{ name: "New", count: student.news.length }} />
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.list}>
          {list}
        </View>
      </ScrollView>
    </>
  )
}

export default New

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