// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::SystemTray;
use resvg::{tiny_skia, usvg};
use image::{ImageBuffer, Rgba};

fn svg_to_png(svg: &str) -> Vec<u8> {
    // Parse the SVG image
    let tree = usvg::Tree::from_str(svg, &usvg::Options::default()).unwrap();
    
    // Convert the SVG image to a PNG image
    let pixmap_size = tree.size();
    let mut pixmap = tiny_skia::Pixmap::new(pixmap_size.width() as u32, pixmap_size.height() as u32).unwrap();
    resvg::render(&tree, tiny_skia::Transform::default(), &mut pixmap.as_mut());

    // Convert the PNG image to a vector of bytes
    let mut png_data = Vec::new();
    let img: ImageBuffer<Rgba<u8>, Vec<u8>> = ImageBuffer::from_raw(
        pixmap.width(),
        pixmap.height(),
        pixmap.data().to_vec()
    ).unwrap();

    img.write_to(&mut std::io::Cursor::new(&mut png_data), image::ImageFormat::Png).unwrap();
    
    png_data
}


#[tauri::command]
fn set_tray_icon(app: tauri::AppHandle, svg: &str) {
    // Convert the SVG image to a PNG image
    let png_data = svg_to_png(svg);

    app.tray_handle().set_icon(tauri::Icon::Raw(png_data)).unwrap();
}

fn main() {
    tauri::Builder::default()
        .system_tray(SystemTray::new())
        .invoke_handler(tauri::generate_handler![set_tray_icon])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}