import { test } from 'regula/fixtures/regula.fixture';
import { expect } from '@playwright/test';
import { faceSDKWebAPItestData as testData } from 'regula/test-data/test.data';

test('Regula Face SDK Web API: check face detection, face matching, face image quality, liveness detection', async ({
  pageProvider,
}) => {
  const homePage = pageProvider.homePage;
  const regulaFaceSDKWebAPISection = homePage.regulaFaceSDKWebAPISection;

  await homePage.goToPage();

  await test.step('check face detection', async () => {
    const faceDetectionTab = regulaFaceSDKWebAPISection.faceDetection;
    await regulaFaceSDKWebAPISection.selectTab('Face detection');
    await faceDetectionTab.uploadPhoto(testData.firstPerson.fotoPath);
    await expect(faceDetectionTab.previewData).toContainText(testData.firstPerson.faceDetectionResult.ageRange);
    await expect(faceDetectionTab.previewData).toContainText(testData.firstPerson.faceDetectionResult.emotion);
  });

  await test.step('check face matching', async () => {
    const faceMatchingTab = regulaFaceSDKWebAPISection.faceMatching;
    await regulaFaceSDKWebAPISection.selectTab('Face matching');
    await faceMatchingTab.uploadPhoto('Reference', testData.firstPerson.fotoPath);
    await faceMatchingTab.uploadPhoto('Compare', testData.secondPerson.fotoPath);
    await expect(faceMatchingTab.machingTabResultTextElement).toContainText(testData.lowSimilarity);
    await faceMatchingTab.uploadPhoto('Reference', testData.firstPerson.fotoPath);
    await faceMatchingTab.uploadPhoto('Compare', testData.firstPerson.fotoPath);
    await expect(faceMatchingTab.machingTabResultTextElement).toContainText(testData.hightSimilarity);
    await faceMatchingTab.uploadPhoto('Reference', testData.secondPerson.fotoPath);
    await faceMatchingTab.uploadPhoto('Compare', testData.secondPerson.fotoPath);
    await expect(faceMatchingTab.machingTabResultTextElement).toContainText(testData.hightSimilarity);
  });

  await test.step('check face image quality', async () => {
    const faceImageQualityTab = regulaFaceSDKWebAPISection.faceImageQuality;
    await regulaFaceSDKWebAPISection.selectTab('Face image quality');
    await faceImageQualityTab.uploadPhoto(testData.firstPerson.fotoPath);
    await expect(faceImageQualityTab.resultStatus).toContainText(testData.firstPersonFaceImageQualityResult.status);
    await expect(faceImageQualityTab.numberOfFailedParameters).toContainText(
      testData.firstPersonFaceImageQualityResult.numberOfFailedParameters,
    );
    await faceImageQualityTab.uploadPhoto(testData.secondPerson.fotoPath);
    await expect(faceImageQualityTab.resultStatus).toContainText(testData.secondPersonFaceImageQualityResult.status);
    await expect(faceImageQualityTab.numberOfFailedParameters).toContainText(
      testData.secondPersonFaceImageQualityResult.numberOfFailedParameters,
    );
  });

  await test.step('check liveness detection "Selfie time!" modal', async () => {
    const livenessDetectionTab = regulaFaceSDKWebAPISection.livenessDetection;
    await regulaFaceSDKWebAPISection.selectTab('Liveness detection');
    await livenessDetectionTab.clickLivenessTryBtn();
    await expect(livenessDetectionTab.modalWindowGoButton).toBeVisible();
    await expect(livenessDetectionTab.modalTitleTextElement).toHaveText(testData.livenessDetectionTabModalTitle);
    await livenessDetectionTab.closeModalWindow();
    await expect(livenessDetectionTab.modalWindowGoButton).not.toBeVisible();
  });
});
