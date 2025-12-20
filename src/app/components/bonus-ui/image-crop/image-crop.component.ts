import { Component } from '@angular/core';
import { Dimensions, ImageCroppedEvent, ImageCropperComponent, ImageTransform } from 'ngx-image-cropper';

import { CardComponent } from "../../../shared/components/ui/card/card.component";

@Component({
    selector: 'app-image-crop',
    imports: [ImageCropperComponent, CardComponent],
    templateUrl: './image-crop.component.html',
    styleUrl: './image-crop.component.scss'
})

export class ImageCropComponent {

    public imageChangedEvent: any = '';
    public croppedImage: string | null | undefined = '';
    public canvasRotation = 0;
    public rotation = 0;
    public scale = 1;
    public showCropper = false;
    public containWithinAspectRatio = false;
    public transform: ImageTransform = {};

    fileChangeEvent(event: any): void {
        this.imageChangedEvent = event;
    }

    imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = event.objectUrl;
    }

    imageLoaded() {
        this.showCropper = true;
    }

    cropperReady(sourceImageDimensions: Dimensions) {}

    loadImageFailed() {}

    rotateLeft() {
        this.canvasRotation--;
        this.flipAfterRotate();
    }

    rotateRight() {
        this.canvasRotation++;
        this.flipAfterRotate();
    }

    private flipAfterRotate() {
        const flippedH = this.transform.flipH;
        const flippedV = this.transform.flipV;
        this.transform = {
            ...this.transform,
            flipH: flippedV,
            flipV: flippedH
        };
    }

    flipHorizontal() {
        this.transform = {
            ...this.transform,
            flipH: !this.transform.flipH
        };
    }

    flipVertical() {
        this.transform = {
            ...this.transform,
            flipV: !this.transform.flipV
        };
    }

    resetImage() {
        this.scale = 1;
        this.rotation = 0;
        this.canvasRotation = 0;
        this.transform = {};
    }

    zoomOut() {
        this.scale -= .1;
        this.transform = {
            ...this.transform,
            scale: this.scale
        };
    }

    zoomIn() {
        this.scale += .1;
        this.transform = {
            ...this.transform,
            scale: this.scale
        };
    }

    toggleContainWithinAspectRatio() {
        this.containWithinAspectRatio = !this.containWithinAspectRatio;
    }

    updateRotation() {
        this.transform = {
            ...this.transform,
            rotate: this.rotation
        };
    }

}
