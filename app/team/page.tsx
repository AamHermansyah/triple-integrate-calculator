import CardTeam from "./CardTeam";

function TeamPage() {
  return (
    <section className="">
      <div className="px-6 py-10 mx-auto">
        <h1 className="text-2xl font-semibold text-center text-white capitalize lg:text-3xl">
          The Executive Team
        </h1>
        <div className="flex justify-center mx-auto mt-6">
          <span className="inline-block w-40 h-1 bg-blue-500 rounded-full" />
          <span className="inline-block w-3 h-1 mx-1 bg-blue-500 rounded-full" />
          <span className="inline-block w-1 h-1 bg-blue-500 rounded-full" />
        </div>
        <p className="max-w-2xl mx-auto mt-6 text-center text-gray-300 tracking-wider">
          Program ini pada dasarnya bertujuan untuk melengkapi salah satu tugas akhir semester dari mata kuliah Kalkulus II di Universitas Siliwangi. Program ini tidak sepenuhnya sempurna dan masih ada beberapa perhitungan yang tidak dapat dilakukan oleh sistem.
        </p>
      </div>
      <div className="mb-10 mx-auto px-4 sm:px-10">
        <div className="grid grid-cols-1 mt-8 lg:grid-cols-2 gap-8 max-w-[700px] lg:max-w-none mx-auto">
          <CardTeam
            name="Aam Hermansyah"
            role="Developer"
            imageUrl="/aam.jpeg"
            socialMedia={[
              {
                key: 'fb',
                name: 'Facebook',
                url: 'https://facebook.com/aam.hermansyah.79'
              },
              {
                key: 'gh',
                name: 'Github',
                url: 'https://github.com/AamHermansyah'
              },
              {
                key: 'ig',
                name: 'Instagram',
                url: 'https://instagram.com/aamhrmnsyah'
              },
              {
                key: 'wa',
                name: 'Whatsapp',
                url: 'https://wa.me/6283131193229'
              }
            ]}
          >
            I am Javascript Developer and Designer. I live in Indonesia from Garut, West Java. I am 20 years old and still a student at Siliwangi University, Tasikmalaya. I started coding at 17 years old and I have a lot of experience in development web application such as HTML, CSS, JS, Next Js, React Js, Web Animation and others.
          </CardTeam>
          <CardTeam
            name="Muhammad Zidan Fatoni"
            role="Designer"
            imageUrl="/zidan.jpeg"
            socialMedia={[
              {
                key: 'fb',
                name: 'Facebook',
                url: 'https://facebook.com/muhamad.z.fatoni'
              },
              {
                key: 'ig',
                name: 'Instagram',
                url: 'https://instagram.com/zidanfatoni_'
              },
              {
                key: 'wa',
                name: 'Whatsapp',
                url: 'https://wa.me/6282218818549'
              }
            ]}
          >
            Dengan pengalaman yang kaya dan luas dalam berbagai jenis fotografi, termasuk potret, wedding, prewedding, engagement, siraman/ngaras, poto produk, alam, dan acara khusus, saya telah mengembangkan kepekaan visual yang tajam dan kemampuan teknis yang kuat.  
          </CardTeam>
        </div>
      </div>
    </section>
  )
}

export default TeamPage;
