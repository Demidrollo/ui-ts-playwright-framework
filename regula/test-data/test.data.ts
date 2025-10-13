export const faceSDKWebAPItestData = {
  firstPerson: {
    fotoPath: 'regula/test-data/fotos/firstperson.jpeg',
    faceDetectionResult: {
      ageRange: '30-32 years old',
      emotion: 'emotional',
    },
  },
  secondPerson: {
    fotoPath: 'regula/test-data/fotos/secondperson.jpeg',
    faceDetectionResult: {
      ageRange: '25-30 years old',
      emotion: 'neutral',
    },
  },
  lowSimilarity: 'Similarity: 3%',
  hightSimilarity: 'Similarity: 99%',
  firstPersonFaceImageQualityResult: {
    status: 'Non-compliant',
    numberOfFailedParameters: '9',
  },
  secondPersonFaceImageQualityResult: {
    status: 'Non-compliant',
    numberOfFailedParameters: '7',
  },
  livenessDetectionTabModalTitle: 'Selfie time!',
};

export const navigationBarTestData = {
  aboutFaceSDKPageURL: /\/products\/face-recognition-sdk/,
  releaseNotesPageURL: /\/develop\/face-sdk\/release-notes/,
  helpCenterPageURL: /hc/,
  blogPageURL: /blog/,
  developerHubPageTitle: 'Regula developer documentation overview - Developer Documentation',
  helpCenterPageTitle: 'Regula Forensics Help Center',
  blogPageTitle: 'Regula Forensics Blog: ID Verification Trends and Insights',
};
