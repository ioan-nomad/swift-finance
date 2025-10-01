Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing

# Get the primary screen bounds
$bounds = [System.Windows.Forms.Screen]::PrimaryScreen.Bounds

# Create a bitmap to hold the screenshot
$bitmap = New-Object System.Drawing.Bitmap($bounds.Width, $bounds.Height)

# Create a graphics object from the bitmap
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)

# Capture the screen
$graphics.CopyFromScreen($bounds.X, $bounds.Y, 0, 0, $bounds.Size)

# Save the screenshot
$screenshotPath = "$env:TEMP\tauri_app_screenshot.png"
$bitmap.Save($screenshotPath)

# Clean up
$graphics.Dispose()
$bitmap.Dispose()

Write-Output $screenshotPath