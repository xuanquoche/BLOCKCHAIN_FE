import PageLoadingImage from '@/assets/images/page-load.jpg'
import Image from 'next/image'

const Home = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <Image src={PageLoadingImage} alt="Page Loading" />
        </div>
    );
}

export default Home;