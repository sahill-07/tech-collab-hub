import { addDoc, collection } from 'firebase/firestore';
import React , {useState , useRef} from 'react'
import TagsInput from 'react-tagsinput'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth, db, storage } from '../../config/firebase-config';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import LoadingBar from '../Discussions/LoadingBar/LoadingBar'
import { useNavigate } from 'react-router-dom';
import backimg from '../../assets/back.png'

const AddDiscussionsDetail = () => {
    const imageRef = useRef(null);
    const [imageUrl, setImageUrl] = useState("");
    const [tags ,setTags] = useState([]);
    const [desc, setDesc] = useState("");
    const [title , setTitle] = useState("")
    const [image , setImage] = useState("")    
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [preview, setPreview] = useState({
        photo: "",
      });


    const handleSubmit = async(e) => {
        setLoading(true);
        e.preventDefault();
        console.log(title);
        console.log(desc)
        try {
            if (title === "" ) {
                toast.error('Please fill the Title');
            } 
            if(desc === ""){
                toast.error('Please Fill the Description')
            }
            
            // const postsCollections = collection(db , "posts");
            const storageRef = ref(storage ,`image/${preview.photo.name}`);
            await uploadBytes(storageRef , preview?.photo)
            const imageUrl = await getDownloadURL(storageRef);
            const user = auth.currentUser;
            const userId = user ? user.uid : null;
   
            const username = user ? user.displayName : null;
            console.log(userId)
            // Add data to Firestore
            const postsCollection = collection(db, "posts");
            await addDoc(postsCollection, {
                username : username ,
                userId: userId,
                title: title,
                desc: desc,
                postImg: imageUrl,
                created: new Date().getTime(),
                pageViews: 0,
                tags: tags // Assuming tags is an array of strings
            });
            toast.success("Post has been added");
            navigate("/discussion")
            setTitle("");
            setDesc("");
            setTags([]);
            setImageUrl("");
        } catch (error) {
            toast.error(error.message);
        } finally{
            setLoading(false);
        }

    }

    const handleClick = () => {
        imageRef.current.click(); 
    }

  return (
    <>
    <div className ="flex flex-row items-center">
        <div>
            <img className="w-16 h-16 cursor-pointer" onClick={()=>navigate("/discussion")} src={backimg} alt="" srcset="" />
        </div>
        <div className='px-6 font-semibold text-2xl'>
                Start a Discussion
        </div>
    </div>
    <div className='p-6 flex flex-col gap-3'>

        <div class="mb-5">
        <label for="base-input"  class="block mb-2 text-sm font-medium text-gray-900 ">Add Title</label>
        <input type="text" value={title}
              onChange={(e) =>
                setTitle( e.target.value )
              } id="base-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
        </div>
        <div class="mb-5">
        <label for="base-input"  class="block mb-2 text-sm font-medium text-gray-900 ">Add Description</label>
        <input type="text"  value={desc}
              onChange={(e) => setDesc(e.target.value)} id="base-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
    </div>
    <div
        style={{backgroundImage:`url(${imageUrl})`}}
        onClick={handleClick}
        className="w-full h-[200px] object-cover border-2 border-gray-500 bg-gray-100 my-3 grid 
        place-items-center cursor-pointer bg-cover bg-no-repeat ">
              { !imageUrl && "Add Image"}
    </div>
    <input
              onChange={(e) => {
                setImageUrl(URL.createObjectURL(e.target.files[0]));
                setPreview({ ...preview, photo: e.target.files[0] });
              }}
              ref={imageRef}
              type="file"
              hidden
    />


<button type="button" onClick={handleSubmit} class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{loading ?"Submitting": "Publish Now"}</button>
    </div>
    
    </>
  )
}

export default AddDiscussionsDetail