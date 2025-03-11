import ListSeries from "@/components/ListSeries";
import { genreDic } from "@/utils/genreDic";

export default function Documentary() {
    const genreId = parseInt(
        Object.keys(genreDic).find(
          key => genreDic[parseInt(key)].en === 'documentary'
        ) || "0"
      );
  return (
     <div>
        <ListSeries genreId={genreId}/>
     </div>
  );
}