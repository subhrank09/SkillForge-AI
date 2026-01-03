// import React, { useState } from 'react';
// import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
// import { useUser } from "@clerk/clerk-react";
// import { getUserHistory } from '../../api/axios'; // Ensure you have this
// import axios from 'axios'; // Direct call for simplicity
// import { FileText, Loader2, Sparkles } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

// // PDF Styles
// const styles = StyleSheet.create({
//   page: { flexDirection: 'column', backgroundColor: '#fff', padding: 30 },
//   section: { margin: 10, padding: 10 },
//   header: { fontSize: 24, marginBottom: 10, textAlign: 'center', fontWeight: 'bold' },
//   text: { fontSize: 12, marginBottom: 5 },
//   bullet: { fontSize: 12, marginBottom: 3, marginLeft: 15 }
// });

// // PDF Document Component
// const ResumeDocument = ({ data, user }) => (
//   <Document>
//     <Page size="A4" style={styles.page}>
//       <View style={styles.section}>
//         <Text style={styles.header}>{user.firstName} {user.lastName}</Text>
//         <Text style={{ textAlign: 'center', color: 'gray', fontSize: 10 }}>{user.primaryEmailAddress?.emailAddress}</Text>
//       </View>
//       <View style={styles.section}>
//         <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 5 }}>Professional Summary</Text>
//         <Text style={styles.text}>{data.summary}</Text>
//       </View>
//       <View style={styles.section}>
//         <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 5 }}>Key Achievements</Text>
//         {data.bullets.map((b, i) => <Text key={i} style={styles.bullet}>• {b}</Text>)}
//       </View>
//       <View style={styles.section}>
//         <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 5 }}>Verified Skills (SkillForge AI)</Text>
//         <Text style={styles.text}>{data.skills.join(', ')}</Text>
//       </View>
//     </Page>
//   </Document>
// );

// const TitanResume = () => {
//   const { user } = useUser();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [resumeData, setResumeData] = useState(null);

//   const generateResume = async () => {
//     setLoading(true);
//     try {
//         // Fetch User Data
//         const history = await getUserHistory(user.id);
//         const courses = history.map(c => c.title);
//         const badges = ["Top 10% Coder", "50 Day Streak"]; // Mock badges for now

//         // Get AI Content
//         const res = await axios.post('http://localhost:9000/api/resume/generate', {
//             userInfo: { name: user.firstName },
//             courses,
//             badges
//         });

//         setResumeData({ ...res.data.data, skills: courses });
//     } catch (err) {
//         console.error(err);
//         alert("Resume Generation Failed");
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white p-8 pt-24 flex flex-col items-center">
//        <div className="max-w-2xl w-full bg-gray-800 p-8 rounded-2xl border border-gray-700 shadow-2xl">
//           <button onClick={() => navigate('/dashboard')} className="text-gray-400 mb-4">← Dashboard</button>
//           <h1 className="text-3xl font-bold mb-6 flex items-center gap-3"><FileText className="text-blue-400"/> Titan Resume Builder</h1>
          
//           {!resumeData ? (
//               <div className="text-center py-10">
//                   <p className="text-gray-400 mb-6">Auto-compile your SkillForge achievements into a professional PDF.</p>
//                   <button onClick={generateResume} disabled={loading} className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-full font-bold flex items-center gap-2 mx-auto">
//                       {loading ? <Loader2 className="animate-spin"/> : <><Sparkles size={18}/> Generate Resume</>}
//                   </button>
//               </div>
//           ) : (
//               <div className="text-center">
//                   <div className="bg-green-900/30 border border-green-500/30 p-4 rounded-lg mb-6 text-green-300">
//                       ✅ Resume Generated Successfully!
//                   </div>
//                   <PDFDownloadLink document={<ResumeDocument data={resumeData} user={user} />} fileName="SkillForge_Resume.pdf">
//                     {({ loading }) => (
//                         <button className="bg-green-600 hover:bg-green-500 text-white px-8 py-3 rounded-full font-bold">
//                             {loading ? 'Preparing PDF...' : 'Download PDF'}
//                         </button>
//                     )}
//                   </PDFDownloadLink>
//               </div>
//           )}
//        </div>
//     </div>
//   );
// };

// export default TitanResume;

import React, { useState } from 'react';
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink, Font } from '@react-pdf/renderer';
import { useUser } from "@clerk/clerk-react";
import { getUserHistory } from '../../api/axios';
import axios from 'axios';
import { FileText, Loader2, Sparkles, Download, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Register a standard font (optional, using Helvetica by default is fine)
// Font.register({ family: 'Roboto', src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf' });

// --- PDF STYLES (MATCHING SUBHRANK PRIYA'S FORMAT) ---
const styles = StyleSheet.create({
  page: { 
    flexDirection: 'column', 
    backgroundColor: '#fff', 
    padding: 30,
    fontFamily: 'Helvetica',
    fontSize: 10,
    lineHeight: 1.4
  },
  headerSection: {
    marginBottom: 15,
    textAlign: 'center'
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 4
  },
  contact: {
    fontSize: 9,
    color: '#333'
  },
  section: {
    marginBottom: 10
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginBottom: 6,
    paddingBottom: 2
  },
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 10
  },
  italicText: {
    fontStyle: 'italic',
    fontSize: 9
  },
  bulletPoint: {
    flexDirection: 'row',
    marginBottom: 1,
    paddingLeft: 5
  },
  bullet: {
    width: 10,
    fontSize: 10
  },
  content: {
    fontSize: 9,
    textAlign: 'justify'
  }
});

// --- THE PDF DOCUMENT COMPONENT ---
const ResumeDocument = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      
      {/* 1. HEADER */}
      <View style={styles.headerSection}>
        <Text style={styles.name}>{data.personal.name}</Text>
        <Text style={styles.contact}>
          {data.personal.email} | {data.personal.phone} | {data.personal.links}
        </Text>
      </View>

      {/* 2. EDUCATION */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Education</Text>
        <View style={styles.subHeader}>
            <Text style={styles.boldText}>{data.education.school}</Text>
            <Text style={styles.italicText}>{data.education.duration}</Text>
        </View>
        <Text style={styles.content}>{data.education.degree}</Text>
      </View>

      {/* 3. OBJECTIVE */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Objective</Text>
        <Text style={styles.content}>{data.objective}</Text>
      </View>

      {/* 4. EXPERIENCE (From Simulations) */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Experience</Text>
        {data.experience.map((exp, i) => (
            <View key={i} style={{ marginBottom: 8 }}>
                <View style={styles.subHeader}>
                    <Text style={styles.boldText}>{exp.role}, {exp.company}</Text>
                    <Text style={styles.italicText}>{exp.duration}</Text>
                </View>
                {exp.points.map((pt, j) => (
                    <View key={j} style={styles.bulletPoint}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.content}>{pt}</Text>
                    </View>
                ))}
            </View>
        ))}
      </View>

      {/* 5. ACOLADES */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Accolades</Text>
        {data.acholades.map((acc, i) => (
            <View key={i} style={styles.bulletPoint}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.content}>{acc}</Text>
            </View>
        ))}
      </View>

      {/* 6. PROJECTS */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Projects</Text>
        {data.projects.map((proj, i) => (
            <View key={i} style={{ marginBottom: 6 }}>
                <Text style={styles.boldText}>{proj.title}</Text>
                <View style={styles.bulletPoint}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.content}>{proj.description}</Text>
                </View>
                <View style={styles.bulletPoint}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={{ ...styles.content, fontWeight: 'bold' }}>Tools Used: {proj.tools}</Text>
                </View>
            </View>
        ))}
      </View>

      {/* 7. TECHNOLOGIES */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Technologies</Text>
        <Text style={styles.content}>
            <Text style={{ fontWeight: 'bold' }}>Languages: </Text> {data.technologies.languages}
        </Text>
        <Text style={{ ...styles.content, marginTop: 2 }}>
            <Text style={{ fontWeight: 'bold' }}>Frameworks/Tools: </Text> {data.technologies.frameworks}
        </Text>
      </View>

    </Page>
  </Document>
);

// --- MAIN COMPONENT ---
const TitanResume = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [resumeData, setResumeData] = useState(null);

  const generateResume = async () => {
    setLoading(true);
    try {
        // 1. Get raw history from DB
        const history = await getUserHistory(user.id);
        
        // 2. Prepare payload
        const payload = {
            userInfo: { 
                name: user.fullName || user.firstName, 
                email: user.primaryEmailAddress?.emailAddress 
            },
            history: history, // Send full history object
            badges: ["Arcade Champion", "Bug Hunter Level 5"] // Replace with real badges if you have them
        };

        // 3. Send to AI to format
        // NOTE: Update URL to your actual backend port (9000)
        const res = await axios.post('http://localhost:9000/api/resume/generate', payload);

        if (res.data.success) {
            setResumeData(res.data.data);
        }
    } catch (err) {
        console.error(err);
        alert("Failed to generate resume. Ensure Backend is running on Port 9000.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#050510] text-white p-8 pt-24 flex flex-col items-center">
       <div className="max-w-3xl w-full bg-gray-900 p-10 rounded-3xl border border-gray-800 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          
          <button onClick={() => navigate('/dashboard')} className="text-gray-500 hover:text-white mb-6 transition-colors">← Back to Command</button>
          
          <div className="flex items-center gap-4 mb-8">
            <div className="p-4 bg-blue-900/20 rounded-2xl border border-blue-500/30 text-blue-400">
                <FileText size={32}/>
            </div>
            <div>
                <h1 className="text-3xl font-black italic uppercase text-white">Titan Resume Builder</h1>
                <p className="text-gray-400 text-sm">Convert your Arcade achievements into a corporate-ready CV.</p>
            </div>
          </div>
          
          {!resumeData ? (
              <div className="text-center py-16 bg-black/20 rounded-2xl border border-gray-800 border-dashed">
                  <div className="max-w-md mx-auto">
                    <Sparkles className="mx-auto text-yellow-400 mb-4" size={40} />
                    <h3 className="text-xl font-bold text-white mb-2">Ready to compile?</h3>
                    <p className="text-gray-500 mb-8 text-sm">
                        Our AI will analyze your "The Forge" projects and "Arcade" simulations to build a resume that passes ATS scanners.
                    </p>
                    
                    <button 
                        onClick={generateResume} 
                        disabled={loading} 
                        className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-xl font-bold flex items-center gap-3 mx-auto transition-all hover:scale-105 shadow-lg shadow-blue-900/20"
                    >
                        {loading ? <Loader2 className="animate-spin"/> : <><FileText size={20}/> Generate PDF Resume</>}
                    </button>
                  </div>
              </div>
          ) : (
              <div className="text-center animate-in fade-in slide-in-from-bottom-4">
                  <div className="bg-green-900/20 border border-green-500/30 p-6 rounded-xl mb-8 flex flex-col items-center gap-2">
                      <CheckCircle className="text-green-400" size={32} />
                      <h3 className="text-green-400 font-bold text-lg">Resume Compiled Successfully</h3>
                      <p className="text-green-400/60 text-sm">Format: "Subhrank Standard" • Size: A4</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button onClick={() => setResumeData(null)} className="py-4 rounded-xl font-bold text-gray-400 hover:text-white hover:bg-gray-800 transition">
                          Discard & Regenerate
                      </button>
                      
                      <PDFDownloadLink document={<ResumeDocument data={resumeData} />} fileName={`${user.firstName}_Resume.pdf`}>
                        {({ loading }) => (
                            <button className="w-full bg-white hover:bg-gray-200 text-black px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all">
                                {loading ? <Loader2 className="animate-spin text-black"/> : <><Download size={20}/> Download PDF</>}
                            </button>
                        )}
                      </PDFDownloadLink>
                  </div>
              </div>
          )}
       </div>
    </div>
  );
};

export default TitanResume;