
import Spinner from '../../ui/Spinner';
import CabinRow from './CabinRow';
import { useCabins } from './useCabins';
import Table from '../../ui/Table';
import { useSearchParams } from 'react-router-dom';






function CabinTable() {
  const {isLoading , cabins } = useCabins()
  const [searchParams] = useSearchParams()
  
  if (isLoading) return <Spinner/>


  // 1 ) Filter
  const filterValue = searchParams.get("discount") || 'all' ;

  let filteredCabins ;
  if(filterValue === "all") filteredCabins = cabins
  if(filterValue === "no-discount") filteredCabins = cabins.filter((cabin) => cabin.discount === 0)
  if(filterValue === "with-discount") filteredCabins = cabins.filter((cabin) => cabin.discount > 0)


  // 2 ) Sort

  const sortBy = searchParams.get('sortBy') || 'startDate-asc'

  const [field , direction] = sortBy.split("-")
  const modifier = direction === "asc" ? 1 : -1 ;
  const sortedCabins = filteredCabins.sort((a,b) => (a[field] - b[field]) * modifier )

  return (
      
      <Table colums=' 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr' >
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>CAPACITY</div>
          <div>PRICE</div>
          <div>DISCOUNT</div>
          <div></div>
        </Table.Header>

        <Table.Body 
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} /> }
        />

      </Table>

  )
}

export default CabinTable;







